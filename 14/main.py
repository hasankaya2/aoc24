import re
with open('./input.txt') as f:
    robots = [list(map(int, re.findall(r"(-?\d+)", x))) for x in f.read().splitlines()]
    map_w = 101
    map_h = 103
    k = map_w // 2
    m = map_h // 2
    q1, q2, q3, q4 = 0, 0, 0, 0
    for cx, cy, vx, vy in robots:
        cx = (cx + 100 * vx) % map_w
        cy = (cy + 100 * vy) % map_h
        if cx < k and cy < m:
            q1 += 1
        if cx < k and cy > m:
            q2 += 1
        if cx > k and cy < m:
            q3 += 1
        if cx > k and cy > m:
            q4 += 1
    time = 1
    while True:
        coords = set()
        overlap = False
        for r in range(len(robots)):
            x, y, vx, vy = robots[r]
            x = (x + vx) % map_w
            y = (y + vy) % map_h
            if (x, y) in coords:
                overlap = True
            coords.add((x, y))
            robots[r][:2] = [x, y]
        if not overlap:
            break
        time += 1
    print("Part 1:", q1 * q2 * q3 * q4)
    print("Part 2:", time)
