import rclpy
from rclpy.node import Node
import numpy as np
import serial
import time
from adafruit_motorkit import MotorKit

class TractorControl(Node):
    def __init__(self):
        super().__init__('tractor_control')
        
        # Initialize motor controllers
        self.kit = MotorKit()
        
        # Initialize serial communication for sensors
        self.serial = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
        
        # Initialize state variables
        self.battery_level = 100
        self.motor_temperature = 25
        self.speed = 0
        self.cutting_status = 'idle'
        self.trailer_status = 'empty'
        
        # Create publishers for telemetry
        self.telemetry_publisher = self.create_publisher(
            String,
            'tractor_telemetry',
            10
        )
        
        # Create subscription for control commands
        self.control_subscription = self.create_subscription(
            String,
            'tractor_control',
            self.control_callback,
            10
        )
        
        # Create timer for periodic telemetry updates
        self.timer = self.create_timer(1.0, self.update_telemetry)

    def control_callback(self, msg):
        command = msg.data
        try:
            if command['type'] == 'movement':
                self.handle_movement(command['x'], command['y'])
            elif command['type'] == 'action':
                self.handle_action(command['action'])
        except Exception as e:
            self.get_logger().error(f'Error processing command: {str(e)}')

    def handle_movement(self, x, y):
        # Convert joystick values to motor speeds
        left_speed = y + x
        right_speed = y - x
        
        # Normalize speeds to motor range (-1 to 1)
        left_speed = np.clip(left_speed, -1, 1)
        right_speed = np.clip(right_speed, -1, 1)
        
        # Set motor speeds
        self.kit.motor1.throttle = left_speed
        self.kit.motor2.throttle = right_speed
        
        self.speed = max(abs(left_speed), abs(right_speed)) * 10  # Convert to km/h

    def handle_action(self, action):
        if action == 'start_cutting':
            self.cutting_status = 'cutting'
            # Activate cutting mechanism
            self.kit.motor3.throttle = 1.0
        elif action == 'stop_cutting':
            self.cutting_status = 'idle'
            # Stop cutting mechanism
            self.kit.motor3.throttle = 0.0
        elif action == 'load_trailer':
            self.trailer_status = 'loading'
            # Activate loading mechanism
            self.kit.motor4.throttle = 1.0
            time.sleep(2)  # Simulate loading time
            self.trailer_status = 'loaded'
            self.kit.motor4.throttle = 0.0
        elif action == 'unload_trailer':
            self.trailer_status = 'unloading'
            # Activate unloading mechanism
            self.kit.motor4.throttle = -1.0
            time.sleep(2)  # Simulate unloading time
            self.trailer_status = 'empty'
            self.kit.motor4.throttle = 0.0

    def update_telemetry(self):
        # Read sensor data
        try:
            sensor_data = self.serial.readline().decode().strip()
            if sensor_data:
                self.motor_temperature = float(sensor_data)
        except:
            pass
        
        # Update battery level (simulated)
        self.battery_level = max(0, self.battery_level - 0.1)
        
        # Create telemetry message
        telemetry = {
            'battery': self.battery_level,
            'speed': self.speed,
            'motor_temperature': self.motor_temperature,
            'cutting_status': self.cutting_status,
            'trailer_status': self.trailer_status
        }
        
        # Publish telemetry
        msg = String()
        msg.data = str(telemetry)
        self.telemetry_publisher.publish(msg)

def main():
    rclpy.init()
    tractor_control = TractorControl()
    rclpy.spin(tractor_control)
    tractor_control.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main() 