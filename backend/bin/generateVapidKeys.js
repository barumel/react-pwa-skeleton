#!/bin/bash

import webpush from 'web-push';
import fs from 'fs-extra';
import path from 'path';

const keys = webpush.generateVAPIDKeys();

fs.writeJsonSync(path.join(process.cwd(), 'secrets', 'vapidKeys.json'), keys, { spaces: 2 });
