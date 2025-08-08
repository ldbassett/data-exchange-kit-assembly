
import { TASKS, BONUSES, ITEMS } from './kitData';

const tagSet = (items) => {
  const s = new Set();
  items.forEach(i => i.tags.forEach(t => s.add(t)));
  return s;
};

function hasAllTags(tagReq, tags) {
  return tagReq.every(t => tags.has(t));
}

function hasAnyGroup(groups, tags) {
  // groups: array of arrays; each array is AND group, groups overall is AND across groups
  // We interpret anyTags as: every group must be satisfied; a group is satisfied if ALL tags in group exist
  return groups.every(group => group.every(t => tags.has(t)));
}

function hasAnyItems(itemIds, pickedIds) {
  return itemIds.every(id => pickedIds.includes(id));
}

export function scoreBuild(picked) {
  const tags = tagSet(picked);
  const pickedIds = picked.map(p=>p.id);
  let total = 0;
  const achievements = [];

  TASKS.forEach(task => {
    const req = task.requires || {};
    let ok = true;
    if (req.anyTags) {
      ok = ok && hasAnyGroup(req.anyTags, tags);
    }
    if (req.anyItems) {
      ok = ok && req.anyItems.every(group => group.some(id => pickedIds.includes(id)));
    }
    if (ok) {
      total += task.points;
      achievements.push({name: task.sticker, points: task.points});
    }
  });

  BONUSES.forEach(b => {
    if (b.anyItems.every(id => pickedIds.includes(id))) {
      total += b.points;
      achievements.push({name: b.name, points: b.points, bonus: true});
    }
  });

  return { total, achievements };
}

export function suggestTasks(picked) {
  const tags = tagSet(picked);
  return TASKS
    .filter(t => (t.requires?.anyTags || []).some(group => group.some(tag => !tags.has(tag))))
    .slice(0, 3);
}

export function getItemById(id) {
  return ITEMS.find(i => i.id === id);
}
