import pandas as pd
from prophet import Prophet
import joblib
import os
from datetime import datetime, timedelta
import numpy as np


TRAINED_MODELS_DIR = 'models'
os.makedirs(TRAINED_MODELS_DIR, exist_ok=True)


DUMMY_COMMODITIES = ["jute" , "sugarcane" , "coconut" , "corn" , "black gram" , "lentil" , "green gram" , "rice" , "finger millet" , "pearl milllet" , "pegion pea" , "sorghum"] 

for commodity_name in DUMMY_COMMODITIES:
    model_save_path = os.path.join(TRAINED_MODELS_DIR, f"{commodity_name}_prophet_model.pkl")

    try:
        # historical data for the model
        start_date = datetime(2020, 1, 1)
        dates = [start_date + timedelta(days=i) for i in range(730)] 
        
        prices = [100 + i * 0.1 + np.sin(i / 30) * 10 + np.random.rand() * 5 for i in range(730)]

        df = pd.DataFrame({'ds': dates, 'y': prices})

        print(f"Creating dummy Prophet model for {commodity_name}...")
        model = Prophet(daily_seasonality=True)
        model.fit(df)

        joblib.dump(model, model_save_path)
        print(f"Dummy Prophet model for {commodity_name} saved to {model_save_path}")

    except Exception as e:
        print(f"An error occurred during dummy model creation for {commodity_name}: {e}")

print("\nFinished creating dummy Prophet models.")
print("You can now run your Flask app (`python main.py` or `flask run`).")