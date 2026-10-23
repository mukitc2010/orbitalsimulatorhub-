// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { AstroBotChat } from './AstroBotChat';
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
describe('ORACLE action acknowledgement', () => {
  it.each([true, false])('reports actual simulator availability: %s', async connected => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({
      reply: 'Prepared orbit.', actions: [{ type: 'SIM_ADD_SATELLITE', payload: { a: 6771, e: 0, i: 0, name: 'LEO' } }],
    }) }));
    const apply = vi.fn();
    render(<AstroBotChat onAction={connected ? apply : undefined} />);
    fireEvent.change(screen.getByPlaceholderText('Transmit a mission or ask about an orbit...'), { target: { value: 'Deploy LEO' } });
    fireEvent.click(screen.getByRole('button', { name: 'TRANSMIT' }));
    expect(await screen.findByText(connected ? 'Applied 1 simulator action(s).' : /Applied 0 of 1 actions/)).toBeInTheDocument();
    expect(apply).toHaveBeenCalledTimes(connected ? 1 : 0);
  });
});
