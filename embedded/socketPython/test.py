
class stack:
  def __init__(self):
    self.items = []

  def __len__(self):
    return len(self.items)

  def push(self, item):
    self.items.append(item)

  def pop(self):
    if not self.isEmpty():
      return self.items.pop(-1)
    else:
      exit()

  def peek(self):
    if not self.isEmpty():
      return self.items[-1]
    else:
      exit()

  def isEmpty(self):
    return len(self.items) == 0

counter = stack()
cnt = 0
IsDown = False
process = 1
while True:

  pose_id = int(input())
  if 0 < pose_id <= 3:
    if counter.__len__() < 3 and IsDown == False:
      if pose_id == process:
        counter.push(pose_id)
        process += 1
        if counter.__len__() == 3:
          IsDown = True
          counter.pop()
          process = 1
    elif IsDown == True:
      if pose_id == counter.peek():
        counter.pop()
        if counter.isEmpty():
          IsDown = False
          cnt+=1
  print('cnt : '+ str(cnt))
