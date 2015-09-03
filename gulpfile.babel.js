import gulp from 'gulp';
import requireDir from 'require-dir';

// Require gulp from subdirectories
requireDir('./gulp/tasks', {recurse: true});