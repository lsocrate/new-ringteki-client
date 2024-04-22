import { SingleColumn } from "@/ui/elements/SingleColumn/SingleColumn";
import { ContentBox } from "@/ui/molecules/ContentBox/ContentBox";
import { SignUpForm } from "@/ui/molecules/SignUpForm/SignUpForm";

export default function Page() {
  return (
    <SingleColumn>
      <ContentBox title="Register an account">
        <SignUpForm />
      </ContentBox>
    </SingleColumn>
  );
}
