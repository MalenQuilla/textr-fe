import 'ldrs/ring';

import {grid, mirage} from 'ldrs'

mirage.register()
grid.register()

export function ButtonLoading() {

    return (
        <div style={{
            padding: '5px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <l-mirage
                size="60"
                speed="2.5"
                color="white"
            ></l-mirage>
        </div>
    );
}

export function ContentLoading({padding}) {

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: `${padding}%`
        }}>
            <l-grid
                size="150"
                speed="1.5"
                color="white"
            ></l-grid>
        </div>
    );
}