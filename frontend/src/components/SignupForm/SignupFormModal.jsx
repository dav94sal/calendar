import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../store/session";
import { useModal } from "../../context/Modal";
import './SignupForm.css';

function SignupFormModal() {
    const [username, setUsername] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const dispatch = useDispatch();
    const { closeModal } = useModal();


    const handleSubmit = e => {
        e.preventDefault()
        const invalidations = {}
        setHasSubmitted(true)

        if (password === confirmPassword) {
            setErrors({})
            const user = {
                username,
                firstName,
                lastName,
                email,
                password
            }
            return dispatch(signup(user))
                .then(closeModal)
                .catch(
                async (res) => {
                  const data = await res.json();
                  if (data?.errors) setErrors(data.errors);
                }
              )
        } else {
            invalidations.confirmPassword =
                'Passwords do not match';
            return setErrors(invalidations);
        }
    };

    return (
        <div>
            <h2>Signup!</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <p className="errors">
                    { hasSubmitted &&
                        errors.username? errors.username : "" }
                </p>
                <input
                    type="text"
                    placeholder="firstName"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
                <p className="errors">
                    { hasSubmitted &&
                        errors.firstName? errors.firstName : "" }
                </p>
                <input
                    type="text"
                    placeholder="lastName"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
                <p className="errors">
                    { hasSubmitted &&
                        errors.lastName? errors.lastName : "" }
                </p>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <p className="errors">
                    { hasSubmitted &&
                        errors.email? errors.email : "" }
                </p>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <p className="errors">
                    { hasSubmitted &&
                        errors.password? errors.password : "" }
                </p>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                <p className="errors">
                    { hasSubmitted &&
                        errors.confirmPassword? errors.confirmPassword : "" }
                </p>
                <button type="submit">Signup</button>
            </form>
        </div>
    )
}

export default SignupFormModal;
