/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateHome = /* GraphQL */ `
  subscription OnCreateHome(
    $filter: ModelSubscriptionHomeFilterInput
    $owner: String
  ) {
    onCreateHome(filter: $filter, owner: $owner) {
      id
      name
      posts {
        items {
          id
          title
          author_id
          author_name
          description
          image
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          homePostsId
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateHome = /* GraphQL */ `
  subscription OnUpdateHome(
    $filter: ModelSubscriptionHomeFilterInput
    $owner: String
  ) {
    onUpdateHome(filter: $filter, owner: $owner) {
      id
      name
      posts {
        items {
          id
          title
          author_id
          author_name
          description
          image
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          homePostsId
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteHome = /* GraphQL */ `
  subscription OnDeleteHome(
    $filter: ModelSubscriptionHomeFilterInput
    $owner: String
  ) {
    onDeleteHome(filter: $filter, owner: $owner) {
      id
      name
      posts {
        items {
          id
          title
          author_id
          author_name
          description
          image
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          homePostsId
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onCreatePost(filter: $filter, owner: $owner) {
      id
      title
      author_id
      author_name
      description
      image
      home {
        id
        name
        posts {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      comments {
        items {
          id
          content
          name
          profile
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          postCommentsId
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      homePostsId
      owner
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onUpdatePost(filter: $filter, owner: $owner) {
      id
      title
      author_id
      author_name
      description
      image
      home {
        id
        name
        posts {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      comments {
        items {
          id
          content
          name
          profile
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          postCommentsId
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      homePostsId
      owner
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onDeletePost(filter: $filter, owner: $owner) {
      id
      title
      author_id
      author_name
      description
      image
      home {
        id
        name
        posts {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      comments {
        items {
          id
          content
          name
          profile
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          postCommentsId
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      homePostsId
      owner
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onCreateComment(filter: $filter, owner: $owner) {
      id
      post {
        id
        title
        author_id
        author_name
        description
        image
        home {
          id
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        comments {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        homePostsId
        owner
      }
      content
      name
      profile
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      postCommentsId
      owner
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onUpdateComment(filter: $filter, owner: $owner) {
      id
      post {
        id
        title
        author_id
        author_name
        description
        image
        home {
          id
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        comments {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        homePostsId
        owner
      }
      content
      name
      profile
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      postCommentsId
      owner
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onDeleteComment(filter: $filter, owner: $owner) {
      id
      post {
        id
        title
        author_id
        author_name
        description
        image
        home {
          id
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        comments {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        homePostsId
        owner
      }
      content
      name
      profile
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      postCommentsId
      owner
    }
  }
`;
export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile(
    $filter: ModelSubscriptionProfileFilterInput
    $owner: String
  ) {
    onCreateProfile(filter: $filter, owner: $owner) {
      userId
      name
      description
      qualifications
      type
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile(
    $filter: ModelSubscriptionProfileFilterInput
    $owner: String
  ) {
    onUpdateProfile(filter: $filter, owner: $owner) {
      userId
      name
      description
      qualifications
      type
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile(
    $filter: ModelSubscriptionProfileFilterInput
    $owner: String
  ) {
    onDeleteProfile(filter: $filter, owner: $owner) {
      userId
      name
      description
      qualifications
      type
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
