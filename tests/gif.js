import {Frame, GIF} from '../ImageScript.js';
import {equals} from "https://deno.land/std@0.80.0/bytes/mod.ts";

(async () => {
    const frames = [];
    for (let i = 0; i < 30; i++) {
        const frame = new Frame(256, 256);
        frame.fill(x => Frame.hslToColor(x / frame.width + i / 30, 1, 0.5));
        frames.push(frame);
    }

    const gif = new GIF(frames);

    const encoded = await gif.encode();
    const desired = await Deno.readFile('./tests/targets/gif.gif');
    Deno.exit(equals(desired, encoded) ? 0 : 1);
})();