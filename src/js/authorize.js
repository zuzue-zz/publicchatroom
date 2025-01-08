import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export function Authorize() {

    // Signup 
    const registerUser = async (fullname, email, password) => {
        const defaultprofileimage = "https://static.thenounproject.com/png/65476-200.png";

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // console.log(user);


            await updateProfile(user, {
                displayName: fullname,
                photoURL: defaultprofileimage
            }).then(() => {
                // console.log("Profile Updated");
                // redirect to profile.html
                window.location.href = "../profile.html";

            });

            // Redirect to index.html  
            window.location.href = "../profile.html";


        } catch (err) {
            console.log("Error registering users : ", err);
        }

    }

    // Signin 
    const loginUser = (email, password) => {

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                // console.log(userCredential.user);

                // set name to localStorage
                setLocalName(userCredential.user);

                // Redirect to index.html
                window.location.href = "../index.html";
            })
            .catch((error) => {
                console.log("Error logging in : ", error.message);
            });
    }

    // Signout 
    const logoutUser = () => {

        signOut(auth)
            .then(() => {

                // unset name from localStorage
                unsetLocalName();

                window.location.href = "../signin.html";
            }).catch((error) => {
                console.log("Error logging out : ", error.message);
            });
    }


    // Reset Password 
    const resetPassword = async (email, msg) => {

        try {

            await sendPasswordResetEmail(auth, email);

            msg.innerHTML = "Password reset email sent. Please check your email inbox.";
            msg.style.color = "green";
            msg.style.fontsize = "11px";


        } catch {
            console.log("Error sending password reset email : ", error.message);

            msg.textContent = `Error : ${error.message}`;
            msg.style.color = "red";
            msg.style.fontsize = "11px";

        }
    }

    // Google Signin 
    const googleLogin = () => {

        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                // console.log(result);
                // set name to localStorage
                setLocalName(result.user.displayName);


                // Redirect to index.html
                window.location.href = "../index.html";
            })
            .catch((error) => {
                console.log("Error with Google Sign-In : ", error.message);
            });
    }

    // Auth Check 
    const isLoggedIn = () => {

        onAuthStateChanged(auth, (userdata) => {
            if (userdata) {
                return true;
            } else {
                // Redirect to signin.html
                window.location.href = "../signin.html";
            }
        });
    }

    // Get User Info 
    const getUser = (callback) => {

        // callback("Hello Sir");

        onAuthStateChanged(auth, (userdata) => {
            if (userdata) {
                callback(userdata);
            }
        });
    }

    const setLocalName = (userdata) => {
        localStorage.setItem('username', userdata.displayName);
    }

    const unsetLocalName = () => {
        localStorage.removeItem('username');
    }

    return { registerUser, loginUser, logoutUser, resetPassword, googleLogin, isLoggedIn, getUser }
}


// google console hate ko thwar.
//     Authentication > Sign -in Method >
//     add Provider > Email / Password >
//         enable | google > enable


// 5FT 