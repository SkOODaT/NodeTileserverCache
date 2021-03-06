'use strict';

import * as child from 'child_process';

export const exec = (path: string, args: string[]): unknown => {
    return new Promise((resolve, reject) => {
        try {
            const shell = child.spawn(path, args);
            shell.stdout.on('data', (data: Buffer) => {
                console.log('Stdout:' + data.toString());
            });
            shell.stderr.on('data', (data: Buffer) => {
                console.log('[ERROR] Stderr:', data.toString());
                resolve(data.toString());
            });
            shell.on('close', (code: number) => {
                //console.log('Child process exited with code:', code);
                if (code > 0) {
                    console.error('[ERROR] Child process exited with non zero exit code:', code);
                }
                resolve(code);
            });
        } catch (e) {
            return reject(e);
        }
    });
};