import re
with open("./input.txt") as f:
    machines = f.read().strip().split("\n\n")

    def run(p2: bool) -> int:
        tokens = 0
        for machine in machines:
            ax, ay, bx, by, px, py = map(int, re.findall(r"(\d+)", machine))
            if p2:
                px += 10000000000000
                py += 10000000000000
            A = (bx * py - by * px) / (bx * ay - by * ax)
            B = (px - ax * A) / bx
            if abs(A - round(A)) < 0.00001 and abs(B - round(B)) < 0.00001:
                tokens += int(A * 3 + B)
        return tokens
print("Part 1:", run(False))
print("Part 2:", run(True))
