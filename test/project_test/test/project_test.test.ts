import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as ProjectTest from '../lib/project_test-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new ProjectTest.ProjectTestStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
