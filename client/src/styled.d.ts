import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    btnColor: string;
    accentColor: string;
    mobile: string;
    tablet: string;
    desktop: string;
  }
}
