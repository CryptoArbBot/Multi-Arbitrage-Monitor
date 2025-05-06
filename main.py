import os
import subprocess
import platform
import sys
from python_healt_repair import ensure_all_good
from requirements import install_requirements

def execute_connector_script():
    py_cmd = "python3" if platform.system() == 'Darwin' else "python"
    root_path = os.path.dirname(os.path.abspath(__file__))
    script_path = os.path.join(root_path, "calculate_api", "mproapi.py" if platform.system() == 'Darwin' else "wproapi.py")

    if not os.path.exists(script_path):
        print(f"Connector script not found at: {script_path}")
        sys.exit(1)

    try:
        subprocess.run([py_cmd, script_path], check=True)
    except subprocess.CalledProcessError as err:
        print(f"Error running connector script: {err}")
        sys.exit(1)

def initialize_bot():
    print("Verifying Python environment...")
    ensure_all_good()

    print("Setting up required packages...")
    install_requirements()

    print("Launching system-specific connector script...")
    execute_connector_script()

    print("Bot setup completed successfully. If the bot doesn't function properly, please run 'python3 main.py' again.")

if __name__ == "__main__":
    initialize_bot()
