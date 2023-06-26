import fs from 'fs';

export default async function Page({page}) {
  if (page === 'one') {
    const markdown = fs.readFileSync('notes/one.md', 'utf-8');
    return (
      <div>
        <h1>Page One!</h1>
        {markdown}
      </div>
    );
  }
  if (page === 'two') {
    const markdown = fs.readFileSync('notes/two.md', 'utf-8');
    return (
      <div>
        <h1>Page Two!</h1>
        {markdown}
      </div>
    );
  }
  if (page === 'three') {
    await new Promise((res) => setTimeout(res, 2000));
    return (
      <div>
        <h1>Page Three!</h1>
      </div>
    );
  }

  return <h1>None</h1>;
}
