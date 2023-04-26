import math


EARTH_RADIUS_KM = 6371.0088


def calculate_distance(prof_lat, prof_long, student_lat, student_long):
    prof_lat, prof_long = float(prof_lat), float(prof_long)

    prof_lat_rad = prof_lat * (math.pi / 180)
    student_lat_rad = student_lat * (math.pi / 180)

    delta_lat_rad = (student_lat - prof_lat) * (math.pi / 180)
    delta_long_rad = (student_long - prof_long) * (math.pi / 180)

    a = (
        math.sin(delta_lat_rad / 2) * math.sin(delta_lat_rad / 2)
        + math.cos(prof_lat_rad) * math.cos(student_lat_rad)
        * math.sin(delta_long_rad / 2) * math.sin(delta_long_rad / 2)
    )

    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return EARTH_RADIUS_KM * c * 1000
