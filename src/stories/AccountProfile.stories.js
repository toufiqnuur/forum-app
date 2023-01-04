import AccountProfile from '../components/AccountProfile';

const story = {
  title: 'AccountProfile',
  component: AccountProfile,
};

export default story;

const TemplateStory = (args) => <AccountProfile {...args} />;

const WithSizeSmall = TemplateStory.bind({});

WithSizeSmall.args = {
  size: 'SM',
};

const WithSizeMedium = TemplateStory.bind({});

WithSizeMedium.args = {
  size: 'MD',
};

const WithSizeLarge = TemplateStory.bind({});

WithSizeLarge.args = {
  size: 'LG',
};

export { WithSizeSmall, WithSizeMedium, WithSizeLarge };
