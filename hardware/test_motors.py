import argparse
import time
import RPi.GPIO as GPIO
from motor_control import MotorControl
from config import MOTOR_CONFIG

def test_motor(motor_name, direction, duration=2):
    """Test a specific motor in a given direction."""
    try:
        motor = MotorControl()
        print(f"Testing {motor_name} motor in {direction} direction...")
        
        # Run motor
        if direction == 'forward':
            motor.set_motor_speed(motor_name, MOTOR_CONFIG['max_speed'])
        else:
            motor.set_motor_speed(motor_name, MOTOR_CONFIG['min_speed'])
            
        print(f"Motor {motor_name} running {direction} for {duration} seconds...")
        time.sleep(duration)
        
        # Stop motor
        motor.set_motor_speed(motor_name, 0)
        print(f"Motor {motor_name} stopped")
        
    except Exception as e:
        print(f"Error testing {motor_name} motor: {str(e)}")
        motor.set_motor_speed(motor_name, 0)

def test_all_motors(duration=2):
    """Test all motors in both directions."""
    motors = ['left', 'right', 'cutting', 'loading']
    directions = ['forward', 'reverse']
    
    for motor in motors:
        for direction in directions:
            test_motor(motor, direction, duration)
            time.sleep(1)  # Pause between tests

def test_motor_limits(motor_name):
    """Test motor speed limits and safety features."""
    try:
        motor = MotorControl()
        print(f"Testing {motor_name} motor limits...")
        
        # Test maximum speed
        print("Testing maximum speed...")
        motor.set_motor_speed(motor_name, MOTOR_CONFIG['max_speed'])
        time.sleep(2)
        
        # Test minimum speed
        print("Testing minimum speed...")
        motor.set_motor_speed(motor_name, MOTOR_CONFIG['min_speed'])
        time.sleep(2)
        
        # Test emergency stop
        print("Testing emergency stop...")
        motor.emergency_stop()
        time.sleep(1)
        
        # Verify motor stopped
        if motor.get_motor_speed(motor_name) == 0:
            print("✓ Emergency stop successful")
        else:
            print("✗ Emergency stop failed")
            
        # Reset motor
        motor.reset_emergency_stop()
        
    except Exception as e:
        print(f"Error testing {motor_name} motor limits: {str(e)}")
        motor.emergency_stop()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Test Sevak tractor motors')
    parser.add_argument('--motor', choices=['left', 'right', 'cutting', 'loading'],
                      help='Test a specific motor')
    parser.add_argument('--direction', choices=['forward', 'reverse'],
                      help='Test motor direction')
    parser.add_argument('--duration', type=float, default=2,
                      help='Duration of each test in seconds')
    parser.add_argument('--limits', action='store_true',
                      help='Test motor speed limits and safety features')
    parser.add_argument('--all', action='store_true',
                      help='Test all motors in both directions')
    
    args = parser.parse_args()
    
    if args.limits and args.motor:
        test_motor_limits(args.motor)
    elif args.motor and args.direction:
        test_motor(args.motor, args.direction, args.duration)
    elif args.all:
        test_all_motors(args.duration)
    else:
        print("Please specify --motor and --direction, --limits, or --all") 