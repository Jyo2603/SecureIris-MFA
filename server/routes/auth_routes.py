# server/routes/auth_routes.py
from flask import Blueprint, request
from controllers.auth_controller import (
    register_user, send_otp, verify_otp, verify_password
)

# Create blueprint for authentication
auth_bp = Blueprint("auth", __name__)

# Register route
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    return register_user(data)

# Send OTP
@auth_bp.route("/send-otp", methods=["POST"])
def send_otp_route():
    data = request.get_json()
    return send_otp(data)

# Verify OTP
@auth_bp.route("/verify-otp", methods=["POST"])
def verify_otp_route():
    data = request.get_json()
    return verify_otp(data)

# Verify password
@auth_bp.route("/verify-password", methods=["POST"])
def verify_password_route():
    data = request.get_json()
    return verify_password(data)
