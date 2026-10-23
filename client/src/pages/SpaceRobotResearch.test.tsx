// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { SpaceRobotResearch } from './SpaceRobotResearch';
import paper from '../data/spaceRobotPaper.json';
afterEach(cleanup);
describe('space robotics paper page', () => {
  it('renders complete research sections, all tables and original download', () => {
    render(<SpaceRobotResearch />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(paper.title);
    expect(screen.getAllByRole('table')).toHaveLength(3);
    expect(screen.getByRole('heading', { name: '11. Conclusion' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Download original/ })).toHaveAttribute('href', '/research/space_robot_research_paper.docx');
    expect(screen.getByText(/Editorial note:/)).toBeInTheDocument();
  });
  it('recalculates task selection when the time budget changes', () => {
    render(<SpaceRobotResearch />);
    fireEvent.change(screen.getByRole('slider', { name: 'Work window (hours)' }), { target: { value: '0' } });
    expect(screen.getByText(/No positive-value task set/)).toBeInTheDocument();
  });
});
