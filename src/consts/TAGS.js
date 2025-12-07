export const TAGS = [
    { id: 'marketing', label: 'Marketing' },
    { id: 'management', label: 'Management' },
    { id: 'hr-recruiting', label: 'HR & Recruiting' },
    { id: 'design', label: 'Design' },
    { id: 'development', label: 'Development' }
];

export const TAG_MAP = TAGS.reduce((acc, t) => {
    acc[t.label] = t.id;
    return acc;
}, {});