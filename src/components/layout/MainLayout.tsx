import React from 'react';

import { AtlassianNavigation, PrimaryButton } from '@atlaskit/atlassian-navigation';

const MainLayout = () => {
  return (
    <AtlassianNavigation
      label="site"
      renderProductHome={() => null}
      primaryItems={[
        <PrimaryButton href="/">User List</PrimaryButton>,
        <PrimaryButton href="/BoardListPage">Board</PrimaryButton>,
        <PrimaryButton href="/TodoListPage">Todo List</PrimaryButton>,
      ]}
    />
  );
};

export default MainLayout;
