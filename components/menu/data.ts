// import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { SettingData } from '../../types/ui';

const helpData = [
    { item: '1', text: 'Enter a movie title', },
    { item: '2', text: 'Select or enter your search', },
    { item: '3', text: 'Select an actor from the list to view their movies.', },
    { item: '4', text: 'Then select a movie from that list, to view the cast.', },
    { item: '5', text: 'Keep going till your hearts content. 🤗', },
];
// TODO: use the proper url for writing review once u get the app on the app store.
const supportData = [
    {
        icon: "📝",
        text: "Write a review",
        url: "https://www.google.com/search?q=todo&rlz=1C1GCEA_enUS997US997&oq=todo&gs_lcrp=EgZjaHJvbWUyFAgAEEUYORhDGIMBGLEDGIAEGIoFMhIIARAAGEMYgwEYsQMYgAQYigUyDAgCEAAYQxiABBiKBTIMCAMQABhDGIAEGIoFMgwIBBAAGEMYgAQYigUyDQgFEC4YgwEYsQMYgAQyDAgGEAAYQxiABBiKBTIKCAcQABixAxiABDINCAgQLhivARjHARiABDINCAkQABiDARixAxiABNIBBzY4NWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8"
        // link: `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${require("../../../eas.json").submit.production.ios.ascAppId}?action=write-review` <--- use this but with bacon.
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