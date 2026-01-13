import React from "react";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import { Dimensions } from "react-native";

export default () => {
    const { width } = Dimensions.get('screen')
    return (

        <ContentLoader
            backgroundColor="#333"
            foregroundColor="#999"
        >

            <Rect x="0" y="0" rx="4" ry="4" width={width} height={150} />
            <Rect x="0" y="166" rx="4" ry="4" width={width} height={150} />
            <Rect x="0" y="332" rx="4" ry="4" width={width} height={150} />
        </ContentLoader>
    )
}