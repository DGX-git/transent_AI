import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
  Link as MuiLink,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

// Custom styled components with #084f82 theme
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  boxShadow:
    "0 25px 50px -12px rgba(8, 79, 130, 0.15), 0 0 0 1px rgba(8, 79, 130, 0.1)",
  backgroundColor: "#fff",
  width: "100%",
  maxWidth: "400px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#084f82",
  color: "white",
  fontWeight: 600,
  padding: "10px 16px",
  borderRadius: 8,
  textTransform: "none",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: "#063d66",
    transform: "translateY(-1px)",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  },
  "&:disabled": {
    backgroundColor: "#9ca3af",
    color: "white",
  },
}));

const StyledTextField = styled(TextField)(({ theme, error }) => ({
  marginBottom: theme.spacing(1.5),
  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
    borderRadius: 8,
    "& fieldset": {
      borderColor: error ? "#ef4444" : "#cfe2f3",
      borderWidth: 2,
    },
    "&:hover fieldset": {
      borderColor: error ? "#ef4444" : "#084f82",
    },
    "&.Mui-focused fieldset": {
      borderColor: error ? "#ef4444" : "#084f82",
      boxShadow: error ? "none" : "0 0 0 3px rgba(8, 79, 130, 0.1)",
    },
  },
  "& .MuiInputLabel-root": {
    color: error ? "#ef4444" : "#6b7280",
    "&.Mui-focused": {
      color: error ? "#ef4444" : "#084f82",
      fontWeight: 500,
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#1e3a5f",
  },
}));

export default function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [emailValidationError, setEmailValidationError] = useState("");

  // Clear form when component mounts/comes back to this page
  useEffect(() => {
    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    });
    setErrors({});
    setTouched({});
    setEmailValidationError("");
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (name === "email" && emailValidationError) {
      setEmailValidationError("");
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
        if (!value || !value.trim()) {
          error = "First Name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = "First Name can only contain letters";
        }
        break;

      case "lastName":
        if (!value || !value.trim()) {
          error = "Last Name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = "Last Name can only contain letters";
        }
        break;

      case "phoneNumber":
        if (!value || !value.trim()) {
          error = "Phone Number is required";
        } else if (!/^[0-9]{10}$/.test(value.replace(/\s/g, ""))) {
          error = "Please enter a valid 10 digit phone number";
        }
        break;

      case "email":
        if (!value || !value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        } else if (emailValidationError) {
          error = emailValidationError;
        }
        break;
      default:
        break;
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Transform form data to match backend field names
      const requestData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email_id: formData.email,
        contact_no: formData.phoneNumber,
      };

      const res = await fetch(
        `${process.env.REACT_APP_TAI_API_URL}/register/createUser`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        if (data.message === "User already exists") {
          showErrorMsg(
            "An account with this email already exists. Please use a different email address or log in instead."
          );
          return;
        }
        console.error("Request failed:", data);
        showErrorMsg(data.message || "Registration failed. Please try again.");
        return;
      }

      // Clear the form after successful registration
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
      });
      setErrors({});
      setTouched({});
      setEmailValidationError("");

      showSuccessMsg("Registration successful!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Frontend error:", error);
      showErrorMsg(
        "An error occurred. Please try again. Make sure the server is running on http://localhost:5000"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    });
    setErrors({});
    setTouched({});
    setEmailValidationError("");
  };

  const showErrorMsg = (message) => {
    setErrorMessage(message);
    setShowErrorSnackbar(true);
  };

  const showSuccessMsg = (message) => {
    setSuccessMessage(message);
    setShowSuccessSnackbar(true);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        height: "90vh", // Added to fix height
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f7fa",
        overflow: "hidden", // Prevent scrollbar
        position: "fixed",
        top: 100,
        left: "35%",
      }}
    >
      {/* Success Snackbar */}
      <Snackbar
        open={showSuccessSnackbar}
        autoHideDuration={4000}
        onClose={() => setShowSuccessSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSuccessSnackbar(false)}
          severity="success"
          icon={<CheckCircleIcon />}
          sx={{ backgroundColor: "#084f82", color: "white" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={showErrorSnackbar}
        autoHideDuration={5000}
        onClose={() => setShowErrorSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowErrorSnackbar(false)}
          severity="error"
          icon={<ErrorIcon />}
          sx={{ backgroundColor: "#ef4444", color: "white" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 3,
          paddingTop: 4,
        }}
      >
        <StyledPaper elevation={3}>
          <Box sx={{ textAlign: "center", mb: 2.5 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#1f2937",
                mb: 0.5,
                fontSize: "1.5rem",
              }}
            >
              Register
            </Typography>
          </Box>

          <Box component="form" noValidate autoComplete="off">
            {/* First Name */}
            <StyledTextField
              fullWidth
              label={
                errors.firstName && touched.firstName
                  ? errors.firstName
                  : "First Name*"
              }
              name="firstName"
              value={formData.firstName}
              onChange={(e) => {
                const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                setFormData((prev) => ({ ...prev, firstName: onlyLetters }));
                if (errors.firstName && onlyLetters.trim() !== "") {
                  setErrors((prev) => ({ ...prev, firstName: "" }));
                }
              }}
              onBlur={handleBlur}
              error={Boolean(errors.firstName && touched.firstName)}
              inputProps={{ maxLength: 30 }}
            />

            {/* Last Name */}
            <StyledTextField
              fullWidth
              label={
                errors.lastName && touched.lastName
                  ? errors.lastName
                  : "Last Name*"
              }
              name="lastName"
              value={formData.lastName}
              onChange={(e) => {
                const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                setFormData((prev) => ({ ...prev, lastName: onlyLetters }));
                if (errors.lastName && onlyLetters.trim() !== "") {
                  setErrors((prev) => ({ ...prev, lastName: "" }));
                }
              }}
              onBlur={handleBlur}
              error={Boolean(errors.lastName && touched.lastName)}
              inputProps={{ maxLength: 30 }}
            />

            {/* Phone Number */}
            <StyledTextField
              fullWidth
              label={
                errors.phoneNumber && touched.phoneNumber
                  ? errors.phoneNumber
                  : "Phone Number*"
              }
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                setFormData((prev) => ({ ...prev, phoneNumber: onlyNums }));
                if (errors.phoneNumber && onlyNums.length === 10) {
                  setErrors((prev) => ({ ...prev, phoneNumber: "" }));
                }
              }}
              onBlur={handleBlur}
              error={Boolean(errors.phoneNumber && touched.phoneNumber)}
              inputProps={{ maxLength: 10 }}
            />

            {/* Email */}
            <StyledTextField
              fullWidth
              label={
                errors.email && touched.email ? errors.email : "Email Address*"
              }
              name="email"
              type="email"
              autoComplete="off"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={Boolean(errors.email && touched.email)}
              inputProps={{
                autoComplete: "new-email",
                form: {
                  autoComplete: "off",
                },
              }}
            />

            {/* Buttons */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <StyledButton
                onClick={handleSubmit}
                disabled={isSubmitting}
                sx={{ minWidth: 150 }}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </StyledButton>
              <StyledButton
                onClick={handleCancel}
                disabled={isSubmitting}
                sx={{ minWidth: 150 }}
              >
                Cancel
              </StyledButton>
            </Box>
          </Box>

          {/* Already have account link */}
          <Box
            sx={{
              textAlign: "center",
              mt: 2,
              pt: 2,
              borderTop: "1px solid #cfe2f3",
            }}
          >
            <Typography variant="body2" sx={{ color: "#084f82" }}>
              Already have an account?{" "}
              <MuiLink
                href="/login"
                sx={{
                  color: "#084f82",
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": {
                    color: "#063d66",
                    textDecoration: "underline",
                  },
                }}
              >
                Log in here
              </MuiLink>
            </Typography>
          </Box>
        </StyledPaper>
      </Box>
    </Box>
  );
}
