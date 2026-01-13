import React from "react";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import { Dimensions } from "react-native";

export default()=>{
    const {width} = Dimensions.get('screen')
    return(
        
        <ContentLoader
        backgroundColor="#333"
        foregroundColor="#999"
    >

        <Circle cx="32" cy="32" r="22" />
        <Rect x="60" y="23" rx="4" ry="4" width={80} height={8} />
        <Rect x="60" y="38" rx="4" ry="4" width={width / 2} height={8} />

        <Circle cx="32" cy="90" r="22" />
        <Rect x="60" y="80" rx="4" ry="4" width={64} height={8} />
        <Rect x="60" y="95" rx="4" ry="4" width={width / 3} height={8} />

        <Circle cx="32" cy="148" r="22" />
        <Rect x="60" y="137" rx="4" ry="4" width={64} height={8} />
        <Rect x="60" y="152" rx="4" ry="4" width={width / 3} height={8} />

        <Circle cx="32" cy="206" r="22" />
        <Rect x="60" y="194" rx="4" ry="4" width={64} height={8} />
        <Rect x="60" y="209" rx="4" ry="4" width={width / 3} height={8} />

        <Circle cx="32" cy="264" r="22" />
        <Rect x="60" y="251" rx="4" ry="4" width={64} height={8} />
        <Rect x="60" y="266" rx="4" ry="4" width={width / 3} height={8} />

        <Circle cx="32" cy="322" r="22" />
        <Rect x="60" y="308" rx="4" ry="4" width={64} height={8} />
        <Rect x="60" y="323" rx="4" ry="4" width={width / 3} height={8} />

    </ContentLoader>
    )
}