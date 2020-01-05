import { registerMutation } from "@ourhands/controller";
import { useMutation } from "@apollo/react-hooks";
import {
  useOnboardingContext,
  submitted
} from "../modules/App/context/onboardingContext";

export const Register = ({
  children,
  emails
}: {
  children: any;
  emails: string[];
}) => {
  const [register] = useMutation(registerMutation);
  const { useDispatch } = useOnboardingContext();
  const dispatch = useDispatch();

  const submit = async () => {
    console.log("emails", emails);
    await register({ variables: { emails } });
    dispatch({ type: "setStage", payload: submitted });
  };
  return children({ submit });
};
