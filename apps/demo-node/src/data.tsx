/* @jsxImportSource jsx-json */

import {jsonx} from 'jsx-json';

export const data = (
    <>
        <name>Omran Jamal</name>
        <height>{173}</height>
        <hobbies>
            {['prem', 'pam potti'].map((hobby) => (
                <array>
                    <>{hobby}</>
                    <>{`${hobby}--`}</>
                </array>
            ))}
        </hobbies>
    </>
);
