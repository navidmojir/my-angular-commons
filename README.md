To use this library in your project first clone and build it using 'ng build'.

Then 'cd' to dist/my-angular-commons and run 'npm link'.

Then go to your app (which using the library) and run 'npm link my-angular-commons'. This will create a symlink in your app node_modules directory.

Then you must enable 'preserveSymlinks' option in your app's angular.json file.

"projects.project-name.architect.build.options.preserveSymlinks": true



