import { describe, expect, it } from 'vitest';
import { button, container, divider, row, text } from '../components';
import { ui } from '../components/ui';
import { resolveDisUI } from '../core';
import { emoji } from '../structures';

describe('render', () => {
  // TODO
  it('', () => {
    const message = ui(
      container(
        text('Hello World').size('h3'),
        divider(),
        row(button('Click me', 'click-me'), button(emoji('👍'), 'like-button').disabled()),
      ).color('#FFF'),
    )
      .mentions('roles', true)
      .mentions('everyone', true)
      .mentions('users', false)
      .ephemeral(true);

    const t = text('Hello World').size('h3');

    console.log(JSON.stringify(resolveDisUI(message), null, 2));
    // console.log(JSON.stringify(resolveDisUI(t), null, 2));

    expect(true).toBe(true);
  });
});
