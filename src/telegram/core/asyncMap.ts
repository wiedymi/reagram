export async function asyncMap(array, callback): array {
  const values = []
  for (let index = 0; index < array.length; index++) {
    values.push(await callback(array[index], index, array))
  }

  return values
}
