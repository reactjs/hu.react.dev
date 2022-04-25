/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * @emails react-core
 * @flow
 */

import Layout from 'components/Layout';
import Container from 'components/Container';
import Header from 'components/Header';
import TitleAndMetaTags from 'components/TitleAndMetaTags';
import React from 'react';
import {urlRoot} from 'site-constants';
import {sharedStyles} from 'theme';

// $FlowFixMe This is a valid path
import versions from '../../content/versions.yml';

type Props = {
  location: Location,
};

const Versions = ({location}: Props) => (
  <Layout location={location}>
    <Container>
      <div css={sharedStyles.articleLayout.container}>
        <div css={sharedStyles.articleLayout.content}>
          <Header>React verziók</Header>
          <TitleAndMetaTags
            canonicalUrl={`${urlRoot}/versions/`}
            title="React - Verziók"
          />
          <div css={sharedStyles.markdown}>
            <p>
              A React teljes kiadási története elérhető{' '}
              <a
                href="https://github.com/facebook/react/releases"
                target="_blank"
                rel="noopener">
                a GitHubon
              </a>
              .<br />
<<<<<<< HEAD
              Lejjebb a jelenlegi kiadások dokumentációja is megtalálható.
=======
              Changelogs for recent releases can also be found below.
>>>>>>> 1d21630e126af0f4c04ff392934dcee80fc54892
            </p>
            <blockquote>
              <p>Note</p>
              <p>
                The current docs are for React 18. For React 17, see{' '}
                <a href="https://17.reactjs.org">https://17.reactjs.org.</a>
              </p>
            </blockquote>
            <p>
              Nézd meg a GY.I.K-et{' '}
              <a href="/docs/faq-versioning.html">
                a számozási irányelveinkről és a stabilitási elkötelezettségünkről
              </a>
              .
            </p>
            {versions.map(version => (
              <div key={version.title}>
                <h3>{version.title}</h3>
                <ul>
                  <li>
                    <a href={version.changelog} target="_blank" rel="noopener">
                      Változási napló
                    </a>
                  </li>
                  {version.path && (
                    <li>
                      <a href={version.path} rel="nofollow">
                        Dokumentáció
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  </Layout>
);

export default Versions;
