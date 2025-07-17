
from prophet import Prophet
import joblib 


prophet_models_dict = {}


for commodity_key in commodity_dict.keys(): 
    prophet_model_file = os.path.join(working_dir, 'models', f"{commodity_key}_prophet_model.pkl")
    try:
        if os.path.exists(prophet_model_file):
            prophet_models_dict[commodity_key] = joblib.load(prophet_model_file)
            logging.info(f"Prophet model for {commodity_key} loaded successfully.")
        else:
            logging.warning(f"Prophet model not found for {commodity_key} at {prophet_model_file}. Price prediction for this crop might not work. Run create_dummy_prophet_models.py")
            prophet_models_dict[commodity_key] = None
    except Exception as e:
        logging.error(f"Error loading Prophet model for {commodity_key}: {e}")
        prophet_models_dict[commodity_key] = None



@app.route('/predict_crop_price_prophet', methods=['POST'])
def predict_crop_price_prophet():
    """
    Predicts future crop prices using a Prophet model for a specific crop.
    Expected JSON input:
    {
        "crop_name": "wheat",  # Must match a key in your commodity_dict (case-insensitive)
        "periods": 30,         # Number of future periods (e.g., days) to predict
        "freq": "D"            # Frequency: 'D' for daily, 'W' for weekly, 'M' for monthly etc.
    }
    """
    data = request.get_json()
    crop_name_input = data.get('crop_name', '').lower() 
    periods = data.get('periods', 7)
    freq = data.get('freq', 'D')

    if not crop_name_input:
        return jsonify({"error": "Crop name is required."}), 400

    prophet_model = prophet_models_dict.get(crop_name_input)
    if prophet_model is None:
        return jsonify({"error": f"Prophet model for '{crop_name_input}' not found or loaded. Please ensure create_dummy_prophet_models.py was run for this crop."}), 404

    try:
        
        future = prophet_model.make_future_dataframe(periods=periods, freq=freq)
        forecast = prophet_model.predict(future)

        
        last_historical_date = prophet_model.history['ds'].max()
        forecast_future = forecast[forecast['ds'] > last_historical_date]

        predictions_list = []
        for index, row in forecast_future.iterrows():
            predictions_list.append({
                "date": row['ds'].strftime("%Y-%m-%d"),
                "predicted_price_yhat": round(row['yhat'], 2),
                "lower_bound": round(row['yhat_lower'], 2), 
                "upper_bound": round(row['yhat_lower'], 2) 
            })

        return jsonify({
            "crop_name": crop_name_input.capitalize(),
            "predictions": predictions_list
        }), 200

    except Exception as e:
        logging.error(f"Error during Prophet prediction for {crop_name_input}: {e}")
        return jsonify({"error": f"An error occurred during Prophet prediction: {e}"}), 500