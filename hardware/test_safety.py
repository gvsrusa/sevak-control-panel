import argparse
import time
import RPi.GPIO as GPIO
from safety import SafetySystem
from config import SAFETY_CONFIG

def test_emergency_stop():
    """Test the emergency stop functionality."""
    try:
        safety = SafetySystem()
        print("Testing emergency stop...")
        
        # Simulate emergency stop button press
        print("Simulating emergency stop button press...")
        safety.handle_emergency_stop()
        
        # Verify motors are stopped
        print("Verifying motors are stopped...")
        if safety.is_emergency_stop_active():
            print("✓ Emergency stop active")
        else:
            print("✗ Emergency stop not active")
            
        # Reset emergency stop
        print("Resetting emergency stop...")
        safety.reset_emergency_stop()
        
        if not safety.is_emergency_stop_active():
            print("✓ Emergency stop reset successful")
        else:
            print("✗ Emergency stop reset failed")
            
    except Exception as e:
        print(f"Error testing emergency stop: {str(e)}")

def test_temperature_monitoring():
    """Test the temperature monitoring system."""
    try:
        safety = SafetySystem()
        print("Testing temperature monitoring...")
        
        # Simulate high temperature
        print("Simulating high temperature...")
        safety.check_temperature(SAFETY_CONFIG['max_temperature'] + 5)
        
        if safety.is_temperature_warning_active():
            print("✓ Temperature warning active")
        else:
            print("✗ Temperature warning not active")
            
        # Simulate normal temperature
        print("Simulating normal temperature...")
        safety.check_temperature(SAFETY_CONFIG['max_temperature'] - 5)
        
        if not safety.is_temperature_warning_active():
            print("✓ Temperature warning cleared")
        else:
            print("✗ Temperature warning not cleared")
            
    except Exception as e:
        print(f"Error testing temperature monitoring: {str(e)}")

def test_battery_monitoring():
    """Test the battery monitoring system."""
    try:
        safety = SafetySystem()
        print("Testing battery monitoring...")
        
        # Simulate low battery
        print("Simulating low battery...")
        safety.check_battery(SAFETY_CONFIG['min_battery'] - 5)
        
        if safety.is_battery_warning_active():
            print("✓ Battery warning active")
        else:
            print("✗ Battery warning not active")
            
        # Simulate normal battery level
        print("Simulating normal battery level...")
        safety.check_battery(SAFETY_CONFIG['min_battery'] + 5)
        
        if not safety.is_battery_warning_active():
            print("✓ Battery warning cleared")
        else:
            print("✗ Battery warning not cleared")
            
    except Exception as e:
        print(f"Error testing battery monitoring: {str(e)}")

def test_all_safety_systems():
    """Test all safety systems in sequence."""
    test_emergency_stop()
    time.sleep(1)
    test_temperature_monitoring()
    time.sleep(1)
    test_battery_monitoring()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Test Sevak tractor safety systems')
    parser.add_argument('--system', choices=['emergency', 'temperature', 'battery'],
                      help='Test a specific safety system')
    parser.add_argument('--all', action='store_true',
                      help='Test all safety systems')
    
    args = parser.parse_args()
    
    if args.system == 'emergency':
        test_emergency_stop()
    elif args.system == 'temperature':
        test_temperature_monitoring()
    elif args.system == 'battery':
        test_battery_monitoring()
    elif args.all:
        test_all_safety_systems()
    else:
        print("Please specify --system or --all") 