import React from "react";
import { Text } from "../../components/Text";
import styled from "@emotion/styled";
import { ThemeProvider } from "emotion-theming";

const theme = {
  fontType: "serif"
};
export const AboutContent = () => {
  return (
    <ThemeProvider theme={theme}>
      <Section>
        <Text color="dark" type="h3">
          Our Hands
        </Text>
        <Text color="dark" type="h5">
          What is it? Why did you build it? What do you mean by "private"? How
          does it work? All these questions and more will be answered here.
        </Text>
      </Section>
      <Section>
        <Text type="document">
          If you've worked at a larger company, you might have experienced the
          feeling of not having a voice. Either you feared repercussions from
          speaking out to your manager, or the idea of putting a target on your
          back by raising your hand during an all-hands meeting wasn't ideal.
        </Text>
      </Section>
      <Section>
        <Text type="document">
          OurHands has been built to give you a voice while keeping you
          anonymous within your company. I want to build a space where you can
          speak out without fear; a place visible only to your company and your
          coworkers, closed off to the outside world, while still giving you the
          anonymity you need to speak out.
        </Text>
      </Section>
      <Section>
        <Text type="document">
          Another service like this exists already: Blind. I downloaded it and
          was not impressed. For one, they are trying very hard to be a social
          media company. Posts are public outside of your company. They bombard
          you with polls and ads. And, they say they have a patentable way to
          keep your email private; I have yet to see the patent. I am sure they
          would be happy to sell all of the data collected on the site to
          whoever happens to be buying.
        </Text>
      </Section>
      <Section>
        <Text type="document">
          For Our Hands, I thought I would go ahead and detail out everything we
          are doing here. I'd rather be open about everything than lie and say
          we have some patent that magically keeps your data private.
        </Text>
      </Section>
      <Section>
        <Text color="dark" type="h4">
          Getting Started - Safety in Numbers
        </Text>
        <Text type="h5" color="dark">
          The Meddling Manager Problem
        </Text>
      </Section>
      <Section>
        <Text type="document">
          If you are the only person at your company who signs up with us and
          posts a question, it would be rather trivial for your boss to figure
          out it was you who posted it - they would simply search through
          everyone's emails, see an OurHands confirmation email, and know it was
          you right away.
        </Text>
      </Section>
      <Section>
        <Text type="document">
          If you are the only person at your company using the platform, this is
          a tricky problem to get around, but we have come up with a solution.
        </Text>
      </Section>
      <Section>
        <Text type="document">
          After you register, and before we send you a confirmation email, we
          ask for other emails of people at your company. Then, we send out the
          same email to everyone saying:
        </Text>
      </Section>
      <Quote>
        <Text type="document">
          "someone at your company has invited you to use OurHands, click the
          link below to get started."
        </Text>
      </Quote>
      <Section>
        <Text type="document">
          Even if no one else signs up after you, this solves the problem.
        </Text>
      </Section>
      <Text color="dark" type="h4">
        Staying Anonymous
      </Text>
      <Section>
        <Text type="document">
          When you create a new post or comment on the platform, you have a few
          options available to you. The post can be <b>public</b>, where your
          email is shown on the post. <b>Private</b>, where your email is hidden
          but still connected to the post in our database, or, the post can{" "}
          <b>anonymous</b>.
        </Text>
      </Section>
      <Section>
        <Text type="document">
          For <b>anonymous</b> posts, your user account is not associated with
          the post on our databases. This means you cannot edit or delete the
          post after it's been created, but, you are guaranteed to never have it
          come back to haunt you.
        </Text>
      </Section>
      <Text color="dark" type="h4">
        Deleting Data
      </Text>
      <Section>
        <Text type="document">
          Data collection is a big deal for internet companies. We collect and
          hoard it because we think that maybe someday we'll happen to save
          something valuable, or that maybe one day our AI's will be so good at
          predicting what we want, that our data is going to be what ultimately
          makes us rich. Because of this, once it's collected, it's almost
          impossible to delete; it's an addiction.
        </Text>
      </Section>
      <Section>
        <Text type="document">
          I've decided to go a different route. After a post or comment has been
          active on the site for 7 days the foreign key to its' creator is
          deleted, meaning there is no connection between you and your posts
          after 7 days. If there is a data breach, the data won't be very
          interesting.
        </Text>
      </Section>
      <Section>
        <Text type="document">
          I have also opted to not track behavioral data. Most internet
          companies say they collect this data to help improve the site; this
          isn't true though. The data is collected so we can figure out how to
          get you to click the thing that makes us the most money. We keep our
          users as lab rats, telling them that everything we do is to make their
          experience better. It's a bad joke. If you think the site could be
          better, just send me a tweet.
        </Text>
      </Section>
      <Text color="dark" type="h4">
        How does this make money?
      </Text>
      <Section>
        <Text type="document">
          Honestly, this is tricky. My first thought was to put an ad on the
          site for a VPN service that would show after you created a post; I
          mean, it makes sense: if you are using this site you should probably
          be using a VPN.
        </Text>
      </Section>
      <Section>
        <Text type="document">
          Instead, I would much rather run a service where a "small" number of
          people pay for it because they like it, rather than trying to sell
          ads.
        </Text>
      </Section>
      <Section>
        <Text type="document">
          For the first 3 months, signups will be free for life. Then, for the
          next 9 months, signups will cost $1 a year. If the site still exists
          after this, then the cost will jump to $10 a year.
        </Text>
      </Section>
      <Text color="dark" type="h4">
        The Future
      </Text>
      <Section>
        <Text type="document">
          This is all dependent on whether people find this thing interesting
          and useful or not. If yes, I'll keep adding features, adapting as the
          community grows. I don't have a lot of expectations right now. I have
          an open mind.
        </Text>
      </Section>
      <Text color="dark" type="document">
        - Joshua
      </Text>
    </ThemeProvider>
  );
};

const Quote = styled.div`
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 40px;
  margin-inline-end: 40px;
  font-weight: 400;
  font-style: italic;
  font-size: 21px;
  border-left: 3px solid rgba(0, 0, 0, 0.84);
  padding-left: 20px;
  margin-left: -23px;
  padding-bottom: 2px;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
`;
