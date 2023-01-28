export type WordScenes = 'word' | 'spy' | 'timer' | 'start';

type SceneBase = {
  type: WordScenes;
  scene?: string;
  duration?: number;
};

export type SpyScene = {
  type: 'spy';
  scene: string;
} & SceneBase;

export type WordScene = {
  type: 'word';
  scene: string;
} & SceneBase;

export type StartScene = {
  type: 'start';
  scene: string;
} & SceneBase;

export type TimerScene = {
  type: 'timer';
  duration: number;
} & SceneBase;

export type Scene = SpyScene | WordScene | TimerScene | StartScene;
