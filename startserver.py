import subprocess
import os
import sys

def check_node_installed():
    try:
        # Check if Node.js is installed by running 'node -v'
        result = subprocess.run(['node', '-v'], capture_output=True, text=True, check=True)
        print(f"Node.js version: {result.stdout.strip()}")
        return True
    except subprocess.CalledProcessError:
        return False
    except FileNotFoundError:
        return False

def start_node_server():
    # Determine the path to the Node.js server file
    server_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'backend/nodeJS/server.js')
    
    # Check if server.js exists
    if not os.path.isfile(server_file):
        print(f"Error: {server_file} does not exist.")
        sys.exit(1)
    
    if not check_node_installed():
        print("Error: Node.js is not installed. Please install Node.js to start the server.")
        sys.exit(1)

    try:
        # Start the Node.js server
        print("Starting Node.js server...")
        subprocess.run(['node', server_file], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Failed to start the server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    start_node_server()
