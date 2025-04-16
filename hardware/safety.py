import time
import RPi.GPIO as GPIO
from config import SAFETY_LIMITS, MOTOR_CONFIG

class SafetySystem:
    def __init__(self):
        self.emergency_stop = False
        self.last_safety_check = time.time()
        self.setup_gpio()

    def setup_gpio(self):
        GPIO.setmode(GPIO.BCM)
        # Setup emergency stop button
        GPIO.setup(23, GPIO.IN, pull_up_down=GPIO.PUD_UP)
        GPIO.add_event_detect(23, GPIO.FALLING, callback=self.emergency_stop_callback, bouncetime=300)

    def emergency_stop_callback(self, channel):
        self.emergency_stop = True
        self.activate_emergency_stop()

    def check_safety_limits(self, telemetry):
        current_time = time.time()
        if current_time - self.last_safety_check >= 1.0:  # Check every second
            self.last_safety_check = current_time
            
            # Check temperature
            if telemetry['motor_temperature'] > SAFETY_LIMITS['max_temperature']:
                self.activate_emergency_stop()
                return False
            
            # Check battery
            if telemetry['battery'] < SAFETY_LIMITS['min_battery']:
                self.activate_low_battery_mode()
                return False
            
            # Check speed
            if telemetry['speed'] > SAFETY_LIMITS['max_speed']:
                self.limit_speed()
                return False
            
            return True
        return True

    def activate_emergency_stop(self):
        # Stop all motors
        for motor in MOTOR_CONFIG.values():
            if 'pin' in motor:
                GPIO.output(motor['pin'], GPIO.LOW)
        
        # Log emergency stop
        print("EMERGENCY STOP ACTIVATED")
        
        # Wait for manual reset
        while self.emergency_stop:
            time.sleep(0.1)

    def activate_low_battery_mode(self):
        # Reduce speed and power consumption
        for motor in MOTOR_CONFIG.values():
            if 'max_speed' in motor:
                motor['max_speed'] *= 0.5
        
        print("LOW BATTERY MODE ACTIVATED")

    def limit_speed(self):
        # Reduce speed to safe limit
        speed_reduction = SAFETY_LIMITS['max_speed'] / self.current_speed
        for motor in MOTOR_CONFIG.values():
            if 'max_speed' in motor:
                motor['max_speed'] *= speed_reduction
        
        print("SPEED LIMITED TO SAFE LEVEL")

    def reset_safety_system(self):
        self.emergency_stop = False
        # Reset motor limits
        for motor in MOTOR_CONFIG.values():
            if 'max_speed' in motor:
                motor['max_speed'] = 1.0
        
        print("SAFETY SYSTEM RESET")

    def cleanup(self):
        GPIO.cleanup() 