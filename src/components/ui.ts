import type { APIMessageComponent } from 'discord-api-types/v10';
import type { DisUIComponent } from '../core/constants';
import { type ComponentBase, constructComponent, render } from '../internal';

export type DisUIAllowedMentionType = 'users' | 'roles' | 'everyone';
export interface UIComponent
  extends ComponentBase<
    'UI',
    { components: APIMessageComponent[]; ephemeral: boolean; mentions: DisUIAllowedMentionType[] }
  > {
  ephemeral: (condition?: boolean) => this;
  mentions: (type: DisUIAllowedMentionType, condition?: boolean) => this;
}

export function ui(...components: (DisUIComponent | null)[]): UIComponent {
  const componentsVar: (DisUIComponent | null)[] = components;
  const mentionsVar: DisUIAllowedMentionType[] = ['users'];
  let ephemeralVar: boolean = false;

  const output = {
    ...constructComponent('UI', ({ stack, context }) => ({
      components: render(componentsVar.filter(Boolean), [...stack, 'UI'], {
        ...context,
      }),
      ephemeral: ephemeralVar,
      mentions: mentionsVar,
    })),

    ephemeral: (condition = true) => {
      ephemeralVar = condition;
      return output;
    },

    mentions: (type: 'users' | 'roles' | 'everyone', condition = true) => {
      if (condition) {
        mentionsVar.push(type);
      } else {
        mentionsVar.splice(mentionsVar.indexOf(type), 1);
      }

      return output;
    },
  };

  return output;
}
