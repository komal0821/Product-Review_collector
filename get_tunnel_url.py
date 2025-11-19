#!/usr/bin/env python3
import subprocess
import time
import re
import sys

def start_tunnel():
    print("🚀 Starting localtunnel...")
    
    # Start localtunnel process
    process = subprocess.Popen(
        ['lt', '--port', '8000'],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        universal_newlines=True,
        bufsize=1
    )
    
    print("⏳ Waiting for tunnel URL...")
    
    # Read output line by line
    for line in iter(process.stdout.readline, ''):
        print(f"Output: {line.strip()}")
        
        # Look for the URL in the output
        url_match = re.search(r'https://[^\s]+\.loca\.lt', line)
        if url_match:
            tunnel_url = url_match.group(0)
            print("\n" + "="*60)
            print("✅ TUNNEL STARTED SUCCESSFULLY!")
            print("="*60)
            print(f"🌐 Your tunnel URL: {tunnel_url}")
            print(f"📱 Webhook URL for Twilio: {tunnel_url}/webhook/whatsapp")
            print("="*60)
            print("\n📋 Next steps:")
            print("1. Copy the webhook URL above")
            print("2. Go to Twilio Console > WhatsApp Sandbox Settings")
            print("3. Paste it in 'Webhook URL for Incoming Messages'")
            print("4. Save configuration")
            print("5. Test by sending 'Hi' on WhatsApp")
            print("\n⚠️  Keep this terminal open to maintain the tunnel!")
            
            # Keep the process running
            try:
                process.wait()
            except KeyboardInterrupt:
                print("\n🛑 Tunnel stopped")
                process.terminate()
            break
    else:
        print("❌ Could not find tunnel URL in output")
        process.terminate()

if __name__ == "__main__":
    start_tunnel()
