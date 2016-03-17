// Server side rendering: Fetches initial data for all components at a
// particular route.
export function fetchRouteComponentsData(store, routerProps, req) {
  return fetchComponentsData(store, routerProps, routerProps.components, req)
}

export function fetchComponentsData(store, routerProps, components, req) {
  return components.filter((component) => {
    if (typeof component.fetchData === 'function') {
      return true
    }
    return false
  }).map((component) => {
    return component.fetchData(store, routerProps, req)
  })
}
