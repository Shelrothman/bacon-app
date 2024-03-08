
const helpData = [
    { item: '1', text: 'Enter a movie title.', },
    { item: '2', text: 'Or switch the search type and enter an actor name.', },
    { item: '3', text: 'Select or enter your search.', },
    { item: '4', text: 'Select an actor from the list to view their movies.', },
    { item: '5', text: 'Click on the Actors name at the top to view their picture.', },
    { item: '6', text: 'Then select a movie from that list, to view the cast.', },
    { item: '7', text: 'Click on the movie title at the top to view its plot.', },
    { item: '8', text: 'Keep going till your hearts content. 🤗', },
];
// TODO: use the proper url for writing review once u get the app on the app store.
const supportData = [
    {
        icon: "📝",
        text: "Write a review",
        url: "itms-apps://itunes.apple.com/app/viewContentsUserReviews/id6479176181?action=write-review"
        // TODO: use dynamic link: `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${require("../../../eas.json").submit.production.ios.ascAppId}?action=write-review` <--- use this but with bacon.
    },
    {
        icon: "⭐",
        text: "Star the project on Github",
        url: "https://github.com/Shelrothman/bacon-app"
    },
    {
        icon: "🐛",
        text: "Report a bug",
        url: "https://github.com/Shelrothman/bacon-app/issues/new"
    },
    {
        icon: "🪙",
        text: "Buy the developer a coffee",
        url: "https://account.venmo.com/u/shelRothman"
    },
];


export { helpData, supportData };