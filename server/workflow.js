export const allowedTransitions = {
  draft: ['submitted'],
  submitted: ['approved', 'rejected'],
  approved: [],
  rejected: ['submitted'],
}

export function assertTransition(current, next, role) {
  if (role !== 'reviewer') {
    const error = new Error('reviewer role required')
    error.status = 403
    error.code = 'FORBIDDEN'
    throw error
  }
  if (!allowedTransitions[current]?.includes(next)) {
    const error = new Error(`${current} cannot transition to ${next}`)
    error.status = 400
    error.code = 'INVALID_TRANSITION'
    throw error
  }
}
