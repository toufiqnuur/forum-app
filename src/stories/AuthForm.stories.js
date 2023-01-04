import AuthForm from '../components/AuthForm';

const story = {
  title: 'AuthForm',
  component: AuthForm,
};

export default story;

const TemplateStory = (args) => <AuthForm {...args} />;

const WithTypeSignIn = TemplateStory.bind({});

WithTypeSignIn.args = {
  type: 'SIGNIN',
};

const WithTypeSignUp = TemplateStory.bind({});

WithTypeSignUp.args = {
  type: 'SIGNUP',
};

export { WithTypeSignIn, WithTypeSignUp };
