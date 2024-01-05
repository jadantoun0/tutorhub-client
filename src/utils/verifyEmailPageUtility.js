export const showErrorAlert = ({setSuccessAlert, setErrorAlert}) => {
    // if is disabled we show an alert
    setSuccessAlert("");
    setErrorAlert("Email may take time to be received. Please wait 2 minutes before requesting a new one.")
    // removing alert after 4s
    setTimeout(() => {
      setErrorAlert("")
    }, 3000)
 }


export const showSuccessAlert = ({setSuccessAlert, setErrorAlert, email}) => {
   setErrorAlert("");
   setSuccessAlert(`Verification code resent to ${email}. It will be received within 30s.`);
    // removing alert after 4 seconds
   setTimeout(() => {
     setSuccessAlert("")
   }, 3000)
 }

