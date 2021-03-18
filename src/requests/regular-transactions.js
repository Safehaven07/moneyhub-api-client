module.exports = ({config, request}) => {
  const {resourceServerUrl} = config

  return {
    getRegularTransactions: async ({userId}) =>
      request(
        `${resourceServerUrl}/regular-transactions`,
        {
          cc: {
            scope: "accounts:read regular_transactions:read transactions:read:all",
            sub: userId,
          },
        },
      ),
  }
}
