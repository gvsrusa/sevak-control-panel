import argparse
import time
import serial
import RPi.GPIO as GPIO
from config import SENSOR_CONFIG

def test_temperature_sensor():
    """Test the temperature sensor."""
    try:
        ser = serial.Serial(
            port=SENSOR_CONFIG['temperature_sensor']['port'],
            baudrate=SENSOR_CONFIG['temperature_sensor']['baud_rate'],
            timeout=1
        )
        
        print("Testing temperature sensor...")
        print("Reading temperature values for 10 seconds...")
        
        for _ in range(10):
            try:
                data = ser.readline().decode().strip()
                if data:
                    temperature = float(data)
                    print(f"Temperature: {temperature}°C")
                else:
                    print("No data received")
            except ValueError:
                print("Invalid temperature reading")
            time.sleep(1)
            
        ser.close()
        print("Temperature sensor test completed!")
        
    except Exception as e:
        print(f"Error testing temperature sensor: {str(e)}")

def test_battery_sensor():
    """Test the battery sensor."""
    try:
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(SENSOR_CONFIG['battery_sensor']['pin'], GPIO.IN)
        
        print("Testing battery sensor...")
        print("Reading battery values for 10 seconds...")
        
        for _ in range(10):
            try:
                # Simulate battery reading (replace with actual ADC reading)
                voltage = GPIO.input(SENSOR_CONFIG['battery_sensor']['pin'])
                battery_percentage = (voltage * SENSOR_CONFIG['battery_sensor']['voltage_divider']) * 100
                print(f"Battery: {battery_percentage:.1f}%")
            except Exception as e:
                print(f"Error reading battery: {str(e)}")
            time.sleep(1)
            
        GPIO.cleanup()
        print("Battery sensor test completed!")
        
    except Exception as e:
        print(f"Error testing battery sensor: {str(e)}")
        GPIO.cleanup()

def test_all_sensors():
    """Test all sensors in sequence."""
    test_temperature_sensor()
    time.sleep(1)
    test_battery_sensor()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Test Sevak tractor sensors')
    parser.add_argument('--sensor', choices=['temperature', 'battery'],
                      help='Test a specific sensor')
    parser.add_argument('--all', action='store_true',
                      help='Test all sensors')
    
    args = parser.parse_args()
    
    if args.sensor == 'temperature':
        test_temperature_sensor()
    elif args.sensor == 'battery':
        test_battery_sensor()
    elif args.all:
        test_all_sensors()
    else:
        print("Please specify --sensor or --all") 