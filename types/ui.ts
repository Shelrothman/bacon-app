export type SettingData = {
    icon: React.ReactElement | string;
    text: string;
    url: string;
};

export enum InputMode {
    movieInput,
    actorInput
}

// TODO: make an enum for the square state