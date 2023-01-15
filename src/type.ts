import type {nothing, TemplateResult} from '@alwatr/element';

export type LitRenderCallbackType = TemplateResult<1> | typeof nothing | Array<LitRenderCallbackType>;
